module EspCkeditor
  class InstallConfigGenerator < Rails::Generators::Base
    desc 'Copy custom_config.js'
    source_root File.expand_path('../templates', __FILE__)

    def copy_config
      copy_file 'custom_config.js', 'vendor/assets/javascripts/esp_ckeditor_custom_config.js'
    end
  end
end
