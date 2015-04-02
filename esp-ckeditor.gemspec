$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'esp-ckeditor/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'esp-ckeditor'
  s.version     = EspCkeditor::VERSION
  s.authors     = ['Evgeny Lapin']
  s.email       = ['mail@openteam.ru']
  s.homepage    = 'http://github.com/openteam-esp/esp-ckeditor'
  s.summary     = 'EspCkeditor.'
  s.description = 'EspCkeditor.'

  s.files = `git ls-files`.split("\n")

  s.add_development_dependency 'rails', '~> 3.2.15'
  s.add_development_dependency 'juicer', '= 1.1.2'
  s.add_development_dependency 'cmdparse', '= 2.0.6'
  s.add_development_dependency 'sass-rails'
  s.add_development_dependency 'uglifier'
  s.add_development_dependency 'turbo-sprockets-rails3'

end
