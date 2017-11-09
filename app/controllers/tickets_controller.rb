class TicketsController < ActionController::Base
  def list
  	#@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
  	#render json: @events
    
    puts "URL: "+request.original_url

    #puts "GOVX PARAM:"+request.GET["govx"]

    govxrequest = "0";
    if(params.has_key?(:govx))
      puts "THIS IS GOVX"
      govxrequest = "1"

      if (cookies['govxss'].to_s == "1")

        puts "GOVX COOKIE EXISTS"
        
      else
        puts "SETTING GOVX COOKIE"
        cookies['govxss'] = {
          :value => '1',
          :expires => 10000.hour.from_now
        }  
      end

    else
      puts "THIS IS NOT GOVX"
      govxrequest = "0"
    end  

    #if request.GET["govx"] == nil
    #  govx_request = 0;  
    #else
    #  govx_request = 1;
    #end

    puts "GOVX: "+govxrequest

    ##Start API Signature generator
    require 'base64'
    require 'openssl'

    if (govxrequest == "1")
      secret = "g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi"   #OLD CORE ACCOUNT
    else
      secret = "tsRLyI1bOcImDLtB/vWukRd9dVqbyvDIWlwBAqUM"   #NEW CORE ACCOUNT      
    end
    request = "GET api.ticketevolution.com/v9/ticket_groups?event_id=" + params[:id] + "&lightweight=true"
    digest = OpenSSL::Digest::Digest.new('sha256')
    signature = Base64.encode64(OpenSSL::HMAC.digest(digest, secret, request)).chomp
    ##End API Signature generator
      
    url = URI.parse("https://api.ticketevolution.com/v9/ticket_groups?event_id=" + params[:id] + "&lightweight=true")
    
    req = Net::HTTP::Get.new(url.to_s)
    req.add_field("X-Signature", signature.to_s)

    if (govxrequest == "1")
      req.add_field("X-Token", "5bfd4b6110681d224a8c1fa6333f375f")   #OLD CORE ACCOUNT
    else 
      req.add_field("X-Token", "8d9b05212613ff4a1f7b620db29ad9b8")   #NEW CORE ACCOUNT         
    end 
    req.add_field("Accept-Encoding", "gzip")
    req.add_field("User-Agent", "tickets (gzip)")
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    response = res.request(req)

    render json: response.body
      
  end
  def show

    core_account_use = "2"
    if (cookies['govxss'].to_s == "1")
      core_account_use = "1"
    end
  	@event = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"], :core_account => core_account_use}).show
  	render json: @event
  end
end