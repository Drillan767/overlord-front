---
title: Using state machines in an ecommerce project
description: How state machines in the Bédéprimée project turned into the
  central point of the checkout and post-checkout process.
image: /images/tauri/logo.png
date: 2024-12-13
tags:
  - Laravel
---

# Context first

As always, a bit of context:

I found this artist on Instagram, where she was selling stickers, pins (mainly), but her only way to do the selling was through... a Google Form. I begged her to make a website for her, and heavily insisted that she could pay it whatever she could afford. I wasn't (still am not) after her money, I couldn't simply live knowing an artist with such talent could have such a bad checkout process.

The thing is, I have absolutely no experience in ecommerce whatsoever, excepted as a customer, but it doesn't tell much. So, we started the project with her describing how she works:

Since it's not her main occupation and she's subject to anxiety, she only makes the customer pay when she's ready to send the order through postal service. This is because the idea of having to prepare x orders for users that have already payed, while the items she sends might be out of stock and she needs to order them again and wait for its shipment, is simply too much pressure for her. Then again, it's not her main occupation.

So, one major reason of why I couldn't simply set up a Strapi with an ecommerce add-on and call it a day, and one early reason of why choosing state machines to anything else to handle an order's status.

# But what are state machines?

Symfony's [documentation](https://symfony.com/doc/current/workflow/workflow-and-state-machine.html) says that a **definition** of a workflow consists of places and actions to get from one place to another. The actions are called **transitions**. A workflow also needs to know each object's position in the workflow. The **marking store** writes the current place to a property on the object.

And a state machine is a subset of a workflow and its purpose is to hold a state of your model. The most important differences between them are:

- Workflows can be in more than one place at the same time, whereas state machines can't;
- In order to apply a transition, workflows require that the object is in all the previous places of the transition, whereas state machines only require that the object is at least in one of those places.

So, to summarize, a state machine is a way to describe a workflow with steps, and what steps are allowed after each of them. To keep using Symfony's example, here is the classic flow of a merge request:

![Git flow](https://symfony.com/doc/7.3/_images/pull_request.png)

In pseudocode / yaml, this gives the following:

```yaml [state-machine.yaml]
places:
  - start
  - coding
  - test
  - review
  - merged
  - closed
transitions:
  submit:
      from: start
      to: test
  update:
      from: [coding, test, review]
      to: test
  wait_for_review:
      from: test
      to: review
  request_change:
      from: review
      to: coding
  accept:
      from: review
      to: merged
  reject:
      from: review
      to: closed
  reopen:
      from: closed
      to: review
```

At this point, I think you should see the benefits of this usage.

# Adapting this for the project

My own architecture doesn't allow such usage with transition names, however, I still defined a list of authorized transitions per status:

```php [App\Enums\OrderStatus.php]
enum OrderStatus: string
{
    case NEW = 'NEW';
    case IN_PROGRESS = 'IN_PROGRESS';
    case PENDING_PAYMENT = 'PENDING_PAYMENT';
    case PAID = 'PAID';
    case TO_SHIP = 'TO_SHIP';
    case SHIPPED = 'SHIPPED';
    case DONE = 'DONE';
    case CANCELLED = 'CANCELLED';
}

```php [App\StateMachines\Order.php]
$transitions = transitions = [
  OrderStatus::NEW->value => [
      OrderStatus::IN_PROGRESS->value,
      OrderStatus::PENDING_PAYMENT->value,
      OrderStatus::CANCELLED->value,
  ],
  OrderStatus::PENDING_PAYMENT->value => [
      OrderStatus::PAID->value,
  ],
  OrderStatus::IN_PROGRESS->value => [
      OrderStatus::PENDING_PAYMENT->value,
      OrderStatus::PAID->value, // Allow direct transition for illustration-only orders
      OrderStatus::CANCELLED->value,
  ],
  OrderStatus::PAID->value => [
      OrderStatus::TO_SHIP->value,
      OrderStatus::DONE->value, // Allow direct completion for digital-only illustration orders
      OrderStatus::CANCELLED->value, // Triggers refund
  ],
  OrderStatus::TO_SHIP->value => [
      OrderStatus::SHIPPED->value,
      OrderStatus::CANCELLED->value, // Triggers refund
  ],
  OrderStatus::SHIPPED->value => [
      OrderStatus::DONE->value,
  ],
  // Terminal states
  OrderStatus::DONE->value => [],
  OrderStatus::CANCELLED->value => [],
];
```
Most of the transitions trigger an event, mainly to send notifications to both the artist and the customer, but it can also be a request to Stripe to create a payment link.

The obvious, Laravel-esque way to handle this would have to be using events emitters and observers, and it's what I did at first, but some of the aspects of this were not satisfying enough to me, mainly because I found my system not fool proof enough.

