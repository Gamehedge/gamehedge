class HomeController < ApplicationController
	
	def index
		require 'date'
		@year = Date.today.strftime("%Y")
		@tiles = Tile.where.not(tile_type_id: nil).order(:position)
		@leagueList = Sport.where(active: true)
		@divisions_menu = Division.all
		@performers_menu = Performer.all
	end
end
