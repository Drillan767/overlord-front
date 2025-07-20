---
title: L'allée des Fées
description: Some website.
image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3'
date: 2024-11-20
tags:
- Laravel
- InertiaJS
- Vue 3
---

This project is a Laravel-based platform on which users can register to attend lessons.

There are many particularities about this project:

1. The administrator has several lessons that last a whole "school year" (from September to July).
2. Each lesson has dozens of recurrences but happens once per week (unless it's a holiday).
3. When creating these occurrences, the platform checks if one occurrence is happening during a holiday, and if so, will skip it until it's a "normal day."
4. Customers can subscribe to a specific lesson and will be linked to it through the whole year.
5. However, it may happen that for some reason they can't attend their lesson. In that case, they can indicate their absence.
6. When they do so, since they have left a spot for the lesson, they may temporarily subscribe to another lesson, on the condition that the ratio of "left/joined" lessons is positive (e.g., they left 6 times and joined 5 lessons, so they can subscribe to one more lesson if there is an open spot).
7. Also, it will display in everyone's control panel that a spot is available for the lesson the person left, so people with a positive ratio can temporarily subscribe to it.

Honestly, it was as easy to develop as it was to explain. That's maybe why it took me more than 6 months to develop the whole process alone.

When I first started the project, a new library named InertiaJS was emerging, allowing developers to elegantly join a Laravel backend with a NodeJS front-end:

```php
use Inertia\Inertia;

class EventsController extends Controller
{
    public function show(Event $event)
    {
        return Inertia::render('Event/Show', [
            'event' => $event->only(
                'id',
                'title',
                'start_date',
                'description'
            ),
        ]);
    }
}

```

Here, Laravel will send the Event record with 4 attributes to a VueJS (or React, or Svelte) component named "Show" that's inside an "Event" directory.

I won't go into details about how it works; the documentation is in the link provided.

I have tons of regrets about this project that I certainly will talk about in an article, but as terrible as my experience with this project was, the development itself was a challenge like I've never seen before.

Also, I tagged "DevOps" on it because it was the first time I ever set up a CI/CD system outside of "official" work and a school project.
