class HomeController < ApplicationController
  def index
  	
	#render json: @events




	#Populate performers script
	
	# @performers = @connection.performers.list({:category_id => 21})
	# @count = 0
	# @performers.each do |performer|
	#    	@client = Performer.where(te_name: performer["name"]).take
	#    	if @client == nil
	#    		Performer.create(te_name: performer["name"], te_slug: performer["slug"], te_uid: performer["id"])
	#    		@count += 1
	#    	end
	   
	# end
	# render json: @count 
	# @list = ["NFC East", "NFC North", "NFC South", "NFC West", "AFC East", "AFC North", "AFC South", "AFC West"]
	# @list.each do |performer|
	# 	Division.create(name: performer, sport_id: 3)
	# end
	#Update passwords from old database
	
	# @users = Client.all()

	# @users.each do |user|
	#   user.password = user.temporal_pass
	# 	user.password_confirmation = user.temporal_pass
	# 	user.save
	# end



	
  end
end
