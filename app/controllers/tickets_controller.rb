class TicketsController < ActionController::Base
  def list
  	#@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
  	#render json: @events
    
    ##Start API Signature generator
    require 'base64'
    require 'openssl'
    secret = "g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi"
    request = "GET api.ticketevolution.com/v9/ticket_groups?event_id=" + params[:id] + "&lightweight=true"
    digest = OpenSSL::Digest::Digest.new('sha256')
    signature = Base64.encode64(OpenSSL::HMAC.digest(digest, secret, request)).chomp
    ##End API Signature generator
      
    url = URI.parse("https://api.ticketevolution.com/v9/ticket_groups?event_id=" + params[:id] + "&lightweight=true")
    
    req = Net::HTTP::Get.new(url.to_s)
    req.add_field("X-Signature", signature.to_s)
    req.add_field("X-Token", "5bfd4b6110681d224a8c1fa6333f375f")
    req.add_field("Accept-Encoding", "gzip")
    req.add_field("User-Agent", "tickets (gzip)")
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    response = res.request(req)

    render json: response.body
      
  end
  def show
  	@event = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).show
  	render json: @event
  end
end