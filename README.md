# Junior Frontend Engineer Challenge

Hi! Welcome to Feeld.

As part of our recruitment process we would like to see how you approach problems, make decisions and code. And, in order to do that, we'd like to ask you to complete this challenge. 

## Background

Our backend team has created an API with one single endpoint `/api/v1/users`. This endpoint returns 20 unique user profiles picked at random from a set of 100. With an example response shown below:

```
{
    "id": "55be3c8fc964860700ebf515",
    "info": {
        "age": 20,
        "type": "single",
        "gender": "male",
        "sexuality": "straight",
        "name": "D",
        // a short text about them
        "about": "\"Tell us more about you\"",
        // a list of desires
        "desires": [
            "Food"
        ],
        // a list of tags they're interested in
        "interests": [
            "Food"
        ]
    },
    "associated": null, // if they're a couple, this will be populated
    "photos": [ // this will be a list of zero or more photos
        {
            "url": "...",
            "width": 716,
            "height": 716
        }
    ]
}
```

The API has a Root URL: https://fld-devtest-api.herokuapp.com, and is authenticated using the following session token that must be supplied in the HTTP request headers (using the `session-token` key):

```
3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=
```

An example query to this endpoint using Curl has been supplied by the backend team as follows:

```
curl -H 'session-token: 3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=' \
https://fld-devtest-api.herokuapp.com/api/v1/users
```

Additionally, our frontend team has prepared a bare-bones React Native app with most things pre-configured for you - things like redux store management, navigation and a simple API layer.

We want you to take it from here!

## The challenge

1. Create a UI for the Discover feed. This should display the profiles in an attractive way, and **must** use the profiles images supplied by the API.
2. Create a way for a user to like, or dislike each profile. After the profile has been rated, it should be removed from the feed.
3. Create a mechanism to fetch 20 new profiles from the API after all of the current profiles have been rated.
4. BONUS: Make use of the "Options" screen, and create a way for users to filter the Discover feed by either age, gender, or sexuality.

> NOTE: For points 2 & 3, it would be great if you can plug into the existing redux sagas architecture, but it's not a requirement. There is no API endpoint for the like/dislike action, so feel free to handle this how you'd like. Mocking the API calls would be A++, but not a requirement.

## Getting started

1. [Setup your development environment for React Native](https://reactnative.dev/docs/environment-setup) (if you haven't already)
2. [Install Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) (if you haven't already)
3. Clone this repo
4. `cd` into the root directory
5. Run `yarn install` to install the dependencies
6. Run `yarn pods` to install the pods required for the iOS project
7. Run `yarn start` to start the packager
8. Run `yarn ios`, or `yarn android` to build and run the project.

After completing the above, the app should open in your simulator/emulator, fetch the first 20 profiles from the API and display them with a basic UI as shown:

<img width="389" alt="Screenshot 2021-03-03 at 19 58 14" src="https://user-images.githubusercontent.com/1439601/109864531-db1ddb80-7c5a-11eb-8dfb-05e4f2746af0.png">


## What we're looking for

* A clean and structured solution.
* A good commit history.
* Attention to detail.

## Submitting your work

You have **one week** to complete this challenge.

Create a pull request with your solution explaining your technical choices, and if you have them, your ideas and suggestions.

## Notes

We've configured the project to use TypeScript, but we don't want this to hold you back. If you'd prefer to use JavaScript we're more than happy for you to do so, and it won't effect how we review your work.

To use JavaScript:
1. Open `tsconfig.json` and replace the contents of the file with an empty object `{ }`.
2. Rename any file where you'd like to use JavaScript to use a `.js, or .jsx` extension.

Also, we don't expect you to understand everything that is included in the sample app. We've configured it to use [redux sagas](https://redux-saga.js.org) simply because that's what we use here at Feeld (and what you'll be working with, if successful). However, we understand that this may be new to you and don't want you to get hung-up trying to learn this architecture. Instead, try and focus on the core concepts of React Native and use the standard library where possible.

> If you'd prefer to use a language other than React Native then we're happy for you to do so. Of course, you'll have to write your own boilerplate code and structure the API call yourself. We're mainly interested to see how you approach problems and we understand that you may have previous experience with languages like Swift.

For the icons, we've already setup an icon library - so if you'd like to add more, or change the existing ones, you'll be able to find the icon names in this [list](https://materialdesignicons.com).

Finally, if you'd like to install any additional dependencies, please do - just remember to explain why in your pull request.

GOOD LUCK!
