class EventsController < ApplicationController
	def index
	end	
  	def near
  		@connection = TicketEvolution::Connection.new({
		  	:token => '5bfd4b6110681d224a8c1fa6333f375f',       # => (required) The API token, used to identify you
		  	:secret => 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi',      # => (required) The API secret, used to sign requests
		                      #               More info: [http://developer.ticketevolution.com/signature_tool](http://developer.ticketevolution.com/signature_tool))
		  	:version => 9,      # => (required) API version to use - the correct version at the time of this writing is 9
		  	:mode => :production,  # => (optional) Specifies the server environment to use Valid options: :production or :sandbox
		  	:logger => nil      # => (optional) Object to use for logging requests and
		                      #               responses. Any 'Logger' instance object
		                      #               is valid. EX: Logger.new('log/te_api.log')
		})
		@events = @connection.events.list(:per_page => 100000, :category_id => 21)
		render json: @events
	end
	def next
		require 'json'
		if request.GET["geolocated"] == "true"
			if cookies[:location_]
				info = ActiveSupport::JSON.decode(cookies[:location_])
				latitude = info['latitude']
				longitude = info['longitude']
			else
				if request.remote_ip == "127.0.0.1"
					info = Pointpin.locate("150.210.231.30")
				else
					info = Pointpin.locate(request.remote_ip)
				end
				cookies[:location_] = {value: info.to_json, expires: 12.hour.from_now}
				latitude = info.latitude
				longitude = info.longitude
			end
			@events = TicketEvolutionService.new({:type => request.GET["type"], :within => 25, :id => request.GET["id"], :geolocated => "true", :latitude => latitude, :longitude => longitude, :page => request.GET["page"], :source => request.GET["source"], :perpage => request.GET["perpage"]}).list
		else
			@events = TicketEvolutionService.new({:type => request.GET["type"], :id => request.GET["id"], :geolocated => "false", :page => request.GET["page"], :source => request.GET["source"], :perpage => request.GET["perpage"]}).list
		end
		
		render json: Pointpin.locate(request.remote_ip).to_json
	end
end
