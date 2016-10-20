class HomeController < ApplicationController
	
	def index
		
		require 'date'
		@year = Date.today.strftime("%Y")

		@tiles = Tile.where.not(tile_type_id: nil).order(:position)

		@auth = client_signed_in?
		
	end
end
