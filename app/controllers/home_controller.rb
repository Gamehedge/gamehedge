class HomeController < ApplicationController
	
	def index
		
		require 'date'
		@year = Date.today.strftime("%Y")

		
		# Event.all.each do |e|
		# 	if !e.venue_configuration_id
		# 		@event = TicketEvolutionService.new({:type => "events", :id => e.te_uid}).show
		# 		if @event["configuration"]
		# 			e.venue_configuration_id = @event["configuration"]["id"]
		# 			e.save
		# 		end
		# 	end
		# end
		# render text: "s"
	end
end
