class Api::V1::OrderStatsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  
  
  def fetch_user
    @order_stat = OrderStat.find_by_id(params[:id])
  end

  def index
    if params[:data] == nil
      @order_stats = OrderStat.all
    else
      @order_stats = OrderStat.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @order_stats }
      format.xml { render xml: @order_stats }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @order_stat }
      format.xml { render xml: @order_stat }
    end
  end

  def create
    @order_stat = OrderStat.new(data_params)
    respond_to do |format|
      if @order_stat.save
        format.json { render json: @order_stat, status: :created }
        format.xml { render xml: @order_stat, status: :created }
      else
        format.json { render json: @order_stat.errors, status: :unprocessable_entity }
        format.xml { render xml: @order_stat.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @order_stat.update_attributes(data_params)
        format.json { render json: @order_stat, status: :ok }
        format.xml { render xml: @order_stat, status: :ok }
      else
        format.json { render json: @order_stat.errors, status: :unprocessable_entity }
        format.xml { render xml: @order_stat.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @order_stat == nil
        format.json { render json: {"message":"OrderStat does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"OrderStat does not exist"}, status: :unprocessable_entity }
      elsif @order_stat.destroy
        format.json { render json: {"message":"OrderStat deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"OrderStat deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @order_stat.errors, status: :unprocessable_entity }
        format.xml { render xml: @order_stat.errors, status: :unprocessable_entity }
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