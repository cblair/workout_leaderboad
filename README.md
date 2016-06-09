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