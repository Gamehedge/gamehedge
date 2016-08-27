class Api::V1::PromoCodesController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @promo_code = PromoCode.find_by_id(params[:id])
  end

  def index
    if params == nil
      @promo_codes = PromoCode.all
    else
      @promo_codes = PromoCode.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @promo_codes }
      format.xml { render xml: @promo_codes }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @promo_code }
      format.xml { render xml: @promo_code }
    end
  end

  def create
    @promo_code = PromoCode.new(data_params)
    @promo_code.password = Devise.friendly_token
    respond_to do |format|
      if @promo_code.save
        format.json { render json: @promo_code, status: :created }
        format.xml { render xml: @promo_code, status: :created }
      else
        format.json { render json: @promo_code.errors, status: :unprocessable_entity }
        format.xml { render xml: @promo_code.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @promo_code.update_attributes(data_params)
        format.json { render json: @promo_code, status: :ok }
        format.xml { render xml: @promo_code, status: :ok }
      else
        format.json { render json: @promo_code.errors, status: :unprocessable_entity }
        format.xml { render xml: @promo_code.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @promo_code == nil
        format.json { render json: {"message":"PromoCode does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"PromoCode does not exist"}, status: :unprocessable_entity }
      elsif @promo_code.destroy
        format.json { render json: {"message":"PromoCode deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"PromoCode deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @promo_code.errors, status: :unprocessable_entity }
        format.xml { render xml: @promo_code.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :value, :is_percentage, :name, :code, :start_date, :end_date, :active)
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