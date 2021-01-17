FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /todo-app
WORKDIR /todo-app
COPY Gemfile /todo-app/Gemfile
COPY Gemfile.lock /todo-app/Gemfile.lock
RUN bundle install
COPY . /todo-app
# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 5000

# Start the main process.
CMD ["bundle", "exec", "rails", "server", "-p", "5000", "-b", "0.0.0.0"]