class HomeController < ApplicationController
  def index
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
	@performers = @connection.performers.list({:category_id => 3}).to_json
	@categories = @connection.categories.list({:id => 15533}).to_json
	#render json: @performers
  end
end
