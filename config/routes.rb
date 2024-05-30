require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users


  root to: "home#index"
  resources :home
  resources :loan, only: [:index, :new, :create, :edit, :update]
  resources :user_dashboard

  namespace :admin do
    root 'home#index'
    get 'loan_requests', to: "home#loan_requests"
    get 'loan_history', to: "home#loan_history"
    resources :home, only: [:index]  # Use HomeController for admin home page
    resources :wallet_transactions, only: [:index]
  end
end
