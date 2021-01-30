Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      # todos
      resources :todos do
      end
      
      get 'todos/tag/:tag', to: 'todos#index_with_tag', as: :tag

      # tags
      resources :tags do
      end

      post '/login', to: "session#login"
      post '/logout', to: "session#logout"
      post '/signup', to: "users#create"
      get '/auth', to: "session#auth"
      
    end
  end
end
