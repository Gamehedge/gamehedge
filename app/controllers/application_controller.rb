class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery unless: -> { request.format.json? }

	# Exception for users without permision cancan
	def access_denied(exception)
		redirect_to :root
	end
end
