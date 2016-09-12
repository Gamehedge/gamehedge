class Api::V1::TestimonialsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  require 'actionpack/action_caching'
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  # Cache 

  caches_action :index
  xpire_action :action => :index
  caches_action :fetch_user
  xpire_action :action => :fetch_user
  
  def fetch_user
    @testimonial = Testimonial.find_by_id(params[:id])
  end

  def index
    if params == nil
      @testimonials = Testimonial.all
    else
      @testimonials = Testimonial.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @testimonials.to_json(:only => [:id, :author, :description], :include => {:performer => {:only =>[:id, :te_uid, :name, :description]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb])}
      format.json { render json: @testimonials.to_json(:only => [:id, :author, :description], :include => {:performer => {:only =>[:id, :te_uid, :name, :description]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb])}
      format.xml { render xml: @testimonials }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @testimonial.to_json(:only => [:id, :author, :description], :include => {:performer => {:only =>[:id, :te_uid, :name, :description]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb])}
      format.xml { render xml: @testimonial.to_json(:only => [:id, :author, :description], :include => {:performer => {:only =>[:id, :te_uid, :name, :description]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb])}
    end
  end

  def create
    @testimonial = Testimonial.new(data_params)
    respond_to do |format|
      if @testimonial.save
        format.json { render json: @testimonial, status: :created }
        format.xml { render xml: @testimonial, status: :created }
      else
        format.json { render json: @testimonial.errors, status: :unprocessable_entity }
        format.xml { render xml: @testimonial.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @testimonial.update_attributes(data_params)
        format.json { render json: @testimonial, status: :ok }
        format.xml { render xml: @testimonial, status: :ok }
      else
        format.json { render json: @testimonial.errors, status: :unprocessable_entity }
        format.xml { render xml: @testimonial.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @testimonial == nil
        format.json { render json: {"message":"Testimonial does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Testimonial does not exist"}, status: :unprocessable_entity }
      elsif @testimonial.destroy
        format.json { render json: {"message":"Testimonial deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Testimonial deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @testimonial.errors, status: :unprocessable_entity }
        format.xml { render xml: @testimonial.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :performer_id, :author, :description, :image)
  end

  private
    def authenticate
      authenticate_or_request_with_http_token do |token, options|
        # Compare the tokens in a time-constant manner, to mitigate
        # timing attacks.
        ActiveSupport::SecurityUtils.secure_compare(
          ::Digest::SHA256.hexdigest(token),
          ::Digest::SHA256.hexdigest(TOKEN)
        )
      end
    end
end