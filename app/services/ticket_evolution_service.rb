class TicketEvolutionService
    
    require 'rubygems'
    require 'ticket_evolution'
    
    # *****************Example of usage**********************
    #@events_tevo =  TicketEvolutionService.new({:type => "order_status"}).sync
    def initialize(params)
        #The parameter type can be: 1. categories, 2. performers, 3. venues, 4. venue_configurations
        @type = params[:type]
        @id = params[:id]
        @name = params[:name]
        @email = params[:email]
        
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
        
    end

    def sync
        case @type
            #Update order statuses from tevo ignoring the final state ones
            when 'order_status'
                @orders = Order.all
                @orders.each do |order|
                  @order = @connection.orders.show(order.te_order_id)
                  if @order['state'] != "canceled" && @order['state'] != "rejected" && @order['state'] != "completed"
                      order.order_status = @order['state']
                      order.save
                  end
                end
            end
        end
    end
end