require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root to: "home#index"
  resources :loan, only: [:index, :new, :create, :edit, :update]
  get 'profile', to: "users#profile"

  namespace :admin do
    # root 'home#index'
    get 'loan_requests', to: "home#loan_requests"
    get 'loan_history', to: "home#loan_history"
    resources :wallet_transactions, only: [:index]
  end
  get "*path", to: "home#index"
end
