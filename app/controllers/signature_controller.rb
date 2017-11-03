class SignatureController < ActionController::Base
  def index

	require 'base64'
	require 'openssl'
	require "net/http"
	require "uri"
	
	token = "5bfd4b6110681d224a8c1fa6333f375f"
	secret = "g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi"

	#token = "bd2d4654ede63cb9d2434b1849890642"
	#secret = "SsHigZENtzhrkpbXkhRLq95+AKK4HXSQKu2jMZF2"
	

	if params[:url] == nil
		url = "GET api.ticketevolution.com/v9/"
		url2 = "https://api.ticketevolution.com/v9/"
	else
		url = "GET api.ticketevolution.com/v9/"+params[:url]
		url2 = "https://api.ticketevolution.com/v9/"+params[:url]
	end
	 
	digest = OpenSSL::Digest::Digest.new('sha256')
	signature = Base64.encode64(OpenSSL::HMAC.digest(digest, secret, url)).chomp
	require 'rest-client'
	response = RestClient.get url2, {:"X-Token" => token, :"X-Signature" => signature, :Accept => "application/json"}
		
	render json: response.body
  end
end