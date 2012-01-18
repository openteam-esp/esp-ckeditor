Rails.application.routes.draw do

  root :to => 'home#index'

  mount EspCkeditor::Engine => "/esp-ckeditor"
end
