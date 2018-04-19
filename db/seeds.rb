# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.create([
  {title: "2 Ways To Do Anything", content: "Do it this way and that way."},
  {title: "Tips for getting to pet every dog you pass on the street", content: "As soon as you're in eyesight of the human, show excitment so they know they're gonna need to stop for you."},
  {title: "Hello RowBoat: CSV Rows to DB Rows", content: 'Originally I set out to write a blog post on how to combine SmarterCSV and activerecord-import to efficiently parse and import CSVs into ActiveRecord models in Ruby. After a few short paragraphs, I realized how much boiler plate there was, and I hate typing out boilerplate 😡. So, I spent a little time wrapping it up in a gem that lets folks focus more on working with their data and less on the nuts and bolts of parsing CSVs and putting records into the database 🙂👍💎. And that, my friends, is how Row Boat was born! Check out the README and the documentation for more information or keep reading for a few quick examples (here’s the repo that contains the examples).'}
])
