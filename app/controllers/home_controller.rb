class HomeController < ApplicationController
	
  def index
  	
  	require 'date'
	@year = Date.today.strftime("%Y")
	
  end
end
