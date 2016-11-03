class Api::V1::DivisionsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  

  def fetch_user
    @division = Division.find_by_id(params[:id])
  end

  def index
    if params == nil
      @divisions = Division.all.limit(10)
    else
      @divisions = Division.includes(:performers).where(data_params).limit(10)
    end
    respond_to do |format|
      if params[:light]
        format.json { render json: @divisions.to_json(:only => [:id, :name, :sport_id, :division_id, :is_main_division, :url])}
        format.xml { render json: @divisions.to_json(:only => [:id, :name, :sport_id, :division_id, :is_main_division, :url])}
      else
        format.json { render json: @divisions.to_json(:only => [:id, :name, :sport_id, :division_id, :is_main_division], :include => {:performers => {:only =>[:id,:name,:url,:wins,:losses,:division_id],:include => {:venue => {:only =>[:id,:name,:url]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb, :image_cover]}})}
      format.xml { render json: @divisions.to_json(:only => [:id, :name, :sport_id, :division_id, :is_main_division], :include => {:performers => {:only =>[:id,:name,:url,:wins,:losses,:division_id],:include => {:venue => {:only =>[:id,:name,:url]}}, :methods => [:image_url, :image_url_medium, :image_url_thumb, :image_cover]}})}
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @division }
      format.xml { render xml: @division }
    end
  end

  def create
    @division = Division.new(data_params)
    respond_to do |format|
      if @division.save
        format.json { render json: @division, status: :created }
        format.xml { render xml: @division, status: :created }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @division.update_attributes(data_params)
        format.json { render json: @division, status: :ok }
        format.xml { render xml: @division, status: :ok }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @division == nil
        format.json { render json: {"message":"Division does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Division does not exist"}, status: :unprocessable_entity }
      elsif @division.destroy
        format.json { render json: {"message":"Division deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Division deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :name, :description, :te_uid, :sport_id, :division_id, :image, :is_main_division, :url)
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