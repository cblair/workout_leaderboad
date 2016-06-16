# workout_leaderboard
A minimalist website for getting workout information from a REST API, using the
Rack gem for Ruby.

# Install and Prerequisites
Run the following commands to get started running locally:

* bundle install

## Pushing to Heroku
This app was started from Heroku's reference on
[Static Sites](https://devcenter.heroku.com/articles/static-sites-ruby).
To deploy to an existing Heroku application via git:

* heroku create
* heroku git:remote -a <app name>
* git push heroku master

# Running locally
Run `rackup` and then go to [http://localhost:9292](http://localhost:9292).

# Design Requirements and Considerations

* Display a summary section that will roll up some neat stats about the results.
What are you calculating/displaying?
    * I decided to show the Rank first, since its most fundemental to a
    leaderboard. This meant I also had to programatically find the lowest rank
    to display by the current user's rank.
    * Then I decided to display the Workout intensity (my interpretation of
    test.value), since it seemed to indicate how the Rank was achieved.
    * I then displayed the workout time, since it may be interesting how long
    a particular workout has helped a user's ranking.
    * I didn't know exactly what RX was, but it was boolean and seemed to
    be important in the rest of the data, so I displayed it in a boolean way.
* How many results are you going to display at a time? (N) Obviously you won’t be able to view 300 athletes at once on a TV, so what number
did you cut that down to and why?
    * I am displaying 6 amount of entries at once because it worked on a
    48" display. A good enhancement would be to determine the viewable size
    with JS and set the number to display in the controller, but may be
    overkill.
* What animations are you using to replace those results with the next N in the
list? We still want to view all of those 300 athletes, how quickly
are you cycling through them?
    * I actually didn't use any animations. With the constant cycling (good),
    it seemed to make the interface too busy. I choose to cycle the time at 
    5 seconds because it seemed to give a good enough time to scan the amount
    of entries displayed, without boring observers by waiting too long.
    Another good enhancement would be to bind a select element value to
    our controllers cycle time, so users can change the tempo.
* Throw the code up on github and send us the repo information to check out.
    * See [https://github.com/cblair/workout_leaderboard](https://github.com/cblair/workout_leaderboard)
* What user experience considerations did you make with your solution / tradeoffs?
    * The site was designed with a user working out in mind. Especially when
    consumed with a workout, users probably want simple, visceral stats that
    are displayed consistently. Field labels should be the same color and be
    in the same place from entry to entry, and the use of icons also helps
    scan the page easily. During competitions, you often see leaderboards,
    and you want to be able to collect lots of information easily with
    minimal clutter, but some cool graphics.
* What third party / open source libs did you use and why?
    * I used Angular since almost all the work was between the client's DOM
    and getting data from a remote API. No server stack was necessary for this
    side of things, besides serving up some simple static assets.
    * I also used Foundation HTML. I've liked its grid in the past, and it uses
    SASS, which is a nice superset of CSS. It has a lower barrier to entry for
    the next supporting developer over things like Bootstrap and LESS, since 
    valid CSS is still valid SASS.
    * I also used Font Awesome for quick, simple, good quality icons.