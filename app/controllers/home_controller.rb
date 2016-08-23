class HomeController < ApplicationController
	
  def index
  	
  	require 'date'
	@year = Date.today.strftime("%Y")

		
  	# @connection = TicketEvolution::Connection.new({
   #        :token => '5bfd4b6110681d224a8c1fa6333f375f',       # => (required) The API token, used to identify you
   #        :secret => 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi',      # => (required) The API secret, used to sign requests
   #                      #               More info: [http://developer.ticketevolution.com/signature_tool](http://developer.ticketevolution.com/signature_tool))
   #        :version => 9,      # => (required) API version to use - the correct version at the time of this writing is 9
   #        :mode => :production,  # => (optional) Specifies the server environment to use Valid options: :production or :sandbox
   #        :logger => nil      # => (optional) Object to use for logging requests and
   #                      #               responses. Any 'Logger' instance object
   #                      #               is valid. EX: Logger.new('log/te_api.log')
   #    })


  	# @performers = @connection.performers.list({:category_id => 21, :per_page => 100000})
  	

  	# Performer.all.each do |p|
  	# 	@performer = @connection.performers.show(p.te_uid)
  	# 	if @performer["venue"] != nil
	  # 		vid = @performer["venue"]["id"]
	  # 		@venue = @connection.venues.show(vid)
	  # 		if Venue.where(te_uid: @venue["id"]).first.name == "abc"
	  # 			Venue.create(name: @venue["name"], address: @venue["address"], te_uid: @venue["id"], location: @venue["location"])
	  # 		end
	  # 	end
  	# end

  	# render json: "s"
	
  	# Event.all.each do |e|
  	# 	e.location = ActiveSupport::JSON.decode(e.data_event)["venue"]["location"]
  	# 	e.save
  	# end
  	
  	# render json: "s"
  	# *******************Update dates for events*******************
	
	# render json: Php.unserialize(Order.where(te_order_id: 3074944).first.order_data) #=> {"foo"=>"bar"}
	# @events = Order.all
	# @events.each do |event|
	# 	date = DateTime.strptime(event.event_date, '%Y-%m-%dT%H:%M:%SZ')
	# 	event.real_event_date = date
	# 	event.save
	# end
	# render json: "success"
	

	# *******************Populate performers script*******************
	
	# @performers = @connection.performers.list({:category_id => 21})
	# @count = 0
	# @performers.each do |performer|
	#    	@client = Performer.where(te_name: performer["name"]).take
	#    	if @client == nil
	#    		Performer.create(te_name: performer["name"], te_slug: performer["slug"], te_uid: performer["id"])
	#    		@count += 1
	#    	end
	   
	# end
	
	# *******************Update passwords from old database*******************
	
	# @users = Client.all()

	# @users.each do |user|
	#   user.password = user.temporal_pass
	# 	user.password_confirmation = user.temporal_pass
	# 	user.save
	# end

	
  end
end
