module EspCkeditor
  class Engine < Rails::Engine
    isolate_namespace EspCkeditor

    initializer "esp-ckeditor.assets_precompile" do |app|
      app.config.assets.precompile += EspCkeditor.assets
    end
  end
end
