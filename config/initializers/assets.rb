# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w( tuMap.css )
Rails.application.config.assets.precompile += %w( style_maps.css )
Rails.application.config.assets.precompile += %w( ladda-themeless.min.css )
Rails.application.config.assets.precompile += %w( jquery.tuMap-min.js )
Rails.application.config.assets.precompile += %w( jquery.hammer.min.js )
Rails.application.config.assets.precompile += %w( jquery.payment.min.js )
Rails.application.config.assets.precompile += %w( masonry.pkgd.min.js )
Rails.application.config.assets.precompile += %w( moment.js )
Rails.application.config.assets.precompile += %w( crs.min.js )
Rails.application.config.assets.precompile += %w( dvm_clientside.js )
Rails.application.config.assets.precompile += %w( scalyr.js )
Rails.application.config.assets.precompile += %w( bootstrap3-typeahead.min.js )
Rails.application.config.assets.precompile += %w( angular.min.js )
Rails.application.config.assets.precompile += %w( angular-animate.min.js )
Rails.application.config.assets.precompile += %w( spin.min.js )
Rails.application.config.assets.precompile += %w( ladda.min.js )
Rails.application.config.assets.precompile += %w( angular-ladda.min.js )
Rails.application.config.assets.precompile += %w( devise.js )
Rails.application.config.assets.precompile += %w( 401.js )
Rails.application.config.assets.precompile += %w( auth.js )



# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
