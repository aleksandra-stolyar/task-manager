Rails.application.routes.draw do
 
  devise_for :users, sign_out_via: [ :post, :delete ]
  root 'projects#index'
  get 'tasks/:id/done', to: 'tasks#done', as: :set_task_done
  get 'projects/new_untitled', to: 'projects#new_untitled', as: :new_untitled_project

  post 'projects/save_sort', to: 'projects#save_sort', as: :save_sort

  resources :projects do
    resources :tasks
  end
 
end
