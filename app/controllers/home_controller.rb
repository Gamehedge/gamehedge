class HomeController < ApplicationController
	
  def index
  	

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
