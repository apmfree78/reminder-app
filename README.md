## Full Stack SaaS App Build with React frontend and Node.js backend

Application was built with **Next.js** full stack framework. **Keystone.js** on backend
to manage a robust **GraphQL** API and **MongoDB** database. Apollo setup on frontend to
call GraphQL API.

Once user creates account they can create reminder timers for specific
activities. They can have timer go off with custom text alert message that user
can set. User can also set sound when timer goes off, and color of reminder
card.

All data is saved to MongoDB database.

## Clean Professional Design using Material UI

Entire frontend design done using Material UI.

## Full User Login and Authentication

Includes user sign in, login, logout, password reset (going to user email), and
persistant session that detect user reminders and show them when user is logged
in.

## Upgrade to gold and platinum level with Stripe

User can click on green "UPGRADE" button to upgrade to Gold or Platinum level.
At the moment this controls how many reminders the user can create. Planning to
add on additional functionality for Platinum users (email and SMS alerts).

Simple stripe credit card box allows users to easily upgrade their subscription.
Once credit card charge goes through, user is instantly upgraded.

## Apollo Cache for Fast Load Times

Front end utilizes Apollo cache to reduce database calls. Cache is only
refreshed when uses makes a change : add/edit/remove a reminder,
login/logout,changes membership level, etc.
