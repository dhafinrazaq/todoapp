Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'
  get 'users/create'
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
    end
  end
end
