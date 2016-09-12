class Api::V1::ServiceFeesController < ApplicationApiController
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
    @service_fee = ServiceFee.find_by_id(params[:id])
  end

  def index
    if params == nil
      @service_fees = ServiceFee.all
    else
      @service_fees = ServiceFee.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @service_fees }
      format.xml { render xml: @service_fees }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @service_fee }
      format.xml { render xml: @service_fee }
    end
  end

  def create
    @service_fee = ServiceFee.new(data_params)
    respond_to do |format|
      if @service_fee.save
        format.json { render json: @service_fee, status: :created }
        format.xml { render xml: @service_fee, status: :created }
      else
        format.json { render json: @service_fee.errors, status: :unprocessable_entity }
        format.xml { render xml: @service_fee.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @service_fee.update_attributes(data_params)
        format.json { render json: @service_fee, status: :ok }
        format.xml { render xml: @service_fee, status: :ok }
      else
        format.json { render json: @service_fee.errors, status: :unprocessable_entity }
        format.xml { render xml: @service_fee.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @service_fee == nil
        format.json { render json: {"message":"ServiceFee does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"ServiceFee does not exist"}, status: :unprocessable_entity }
      elsif @service_fee.destroy
        format.json { render json: {"message":"ServiceFee deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"ServiceFee deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @service_fee.errors, status: :unprocessable_entity }
        format.xml { render xml: @service_fee.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :minimum_amount, :fee_amount, :description)
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