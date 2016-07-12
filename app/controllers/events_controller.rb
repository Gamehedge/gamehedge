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
		if request.remote_ip == "127.0.0.1"
			info = Geocoder.search("150.210.231.30").first
		else
			info = Geocoder.search(request.remote_ip).fisrt
		end

		@events = @connection.events.list({:category_id => request.GET["id"], :lat => info.data["latitude"], :lon => info.data["longitude"], :within => 25,:page => 1, :per_page => 8, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})#, :occurs_at => DateTime.now.iso8601(), })
		render json: @events
	end
end