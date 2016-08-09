Rails.application.routes.draw do
  get 'events/near'

  devise_for :clients
  get 'home/index'
  get 'events/near'
  get 'events/next'
  resources :search
  devise_for :admin_users, ActiveAdmin::Devise.config
  
  ActiveAdmin.routes(self)
  root "home#index"
  


  namespace :api do
    namespace :v1 do
      resources :clients, :defaults => { :format => 'json' }
      resources :events, :defaults => { :format => 'json' }
      resources :orders, :defaults => { :format => 'json' }
      resources :order_stats, :defaults => { :format => 'json' }
      resources :performers, :defaults => { :format => 'json' }
      resources :divisions, :defaults => { :format => 'json' }
      resources :sports, :defaults => { :format => 'json' }
      resources :tiles, :defaults => { :format => 'json' }
      resources :venues, :defaults => { :format => 'json' }
    end
  end
  
  match "*path" => "home#index", via: [:get, :post]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
