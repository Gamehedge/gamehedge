class Api::V1::TilesController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @tile = Tile.find_by_id(params[:id])
  end

  def index
    if params[:data] == nil
      @tiles = Tile.all
    else
      @tiles = Tile.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @tiles.to_json(:only => [:id, :name, :link, :slug, :has_geolocation, :image], :include => {:sport => {:only =>[:id, :name, :description]},:performer => {:only =>[:id, :te_name]},:venue => {:only =>[:id, :name, :description]},:tile_type => {:only =>[:id, :name]}})}
      format.xml { render xml: @tiles }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @tile }
      format.xml { render xml: @tile }
    end
  end

  def create
    @tile = Tile.new(data_params)
    @tile.password = Devise.friendly_token
    respond_to do |format|
      if @tile.save
        format.json { render json: @tile, status: :created }
        format.xml { render xml: @tile, status: :created }
      else
        format.json { render json: @tile.errors, status: :unprocessable_entity }
        format.xml { render xml: @tile.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @tile.update_attributes(data_params)
        format.json { render json: @tile, status: :ok }
        format.xml { render xml: @tile, status: :ok }
      else
        format.json { render json: @tile.errors, status: :unprocessable_entity }
        format.xml { render xml: @tile.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @tile == nil
        format.json { render json: {"message":"Tile does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Tile does not exist"}, status: :unprocessable_entity }
      elsif @tile.destroy
        format.json { render json: {"message":"Tile deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Tile deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @tile.errors, status: :unprocessable_entity }
        format.xml { render xml: @tile.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.require(:data).permit(:id, :modelo, :marca, :capacidad, :user_id)
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