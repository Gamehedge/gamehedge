class Api::V1::ClientsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
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
    @client = Client.find_by_id(params[:id])
  end

  def index
    if params == nil
      @clients = Client.all
    else
      @clients = Client.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @clients }
      format.xml { render xml: @clients }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @client }
      format.xml { render xml: @client }
    end
  end

  def create
    @client = Client.new(data_params)
    @client.password = Devise.friendly_token
    respond_to do |format|
      if @client.save
        format.json { render json: @client, status: :created }
        format.xml { render xml: @client, status: :created }
      else
        format.json { render json: @client.errors, status: :unprocessable_entity }
        format.xml { render xml: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @client.update_attributes(data_params)
        format.json { render json: @client, status: :ok }
        format.xml { render xml: @client, status: :ok }
      else
        format.json { render json: @client.errors, status: :unprocessable_entity }
        format.xml { render xml: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @client == nil
        format.json { render json: {"message":"Client does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Client does not exist"}, status: :unprocessable_entity }
      elsif @client.destroy
        format.json { render json: {"message":"Client deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Client deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @client.errors, status: :unprocessable_entity }
        format.xml { render xml: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:name, :email, :te_uid)
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