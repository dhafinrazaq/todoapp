Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :todos do
      end
      # link tags to todos with the respective tag
      get 'tags/:tag', to: 'todos#index', as: :tag
    end
  end
end
