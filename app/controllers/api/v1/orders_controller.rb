class Api::V1::OrdersController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  
  
  def fetch_user
    @order = Order.find_by_id(params[:id])
  end

  def index
    if params == nil
      @orders = Order.all
    else
      @orders = Order.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @orders.to_json(:only => [:client_id, :client_name, :discount, :te_order_id, :event_name, :event_date, :event_location, :ticket_section, :cost, :ticket_row, :ticket_seats, :ticket_format, :total, :customer_email, :number_of_tickets, :sale_price_per_ticket, :ticket_total, :broker_name, :service_fee, :shipping_fee, :real_event_date, :order_data], :include => {:refund_status => {:only =>[:id, :name]}})}
      format.xml { render xml: @orders.to_json(:only => [:client_id, :client_name, :discount, :te_order_id, :event_name, :event_date, :event_location, :ticket_section, :cost, :ticket_row, :ticket_seats, :ticket_format, :total, :customer_email, :number_of_tickets, :sale_price_per_ticket, :ticket_total, :broker_name, :service_fee, :shipping_fee, :real_event_date, :order_data], :include => {:refund_status => {:only =>[:id, :name]}})}
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @order.to_json(:only => [:client_id, :client_name, :discount, :te_order_id, :event_name, :event_date, :event_location, :ticket_section, :cost, :ticket_row, :ticket_seats, :ticket_format, :total, :customer_email, :number_of_tickets, :sale_price_per_ticket, :ticket_total, :broker_name, :service_fee, :shipping_fee, :real_event_date, :order_data], :include => {:refund_status => {:only =>[:id, :name]}})}
      format.xml { render xml: @order.to_json(:only => [:client_id, :client_name, :discount, :te_order_id, :event_name, :event_date, :event_location, :ticket_section, :cost, :ticket_row, :ticket_seats, :ticket_format, :total, :customer_email, :number_of_tickets, :sale_price_per_ticket, :ticket_total, :broker_name, :service_fee, :shipping_fee, :real_event_date, :order_data], :include => {:refund_status => {:only =>[:id, :name]}})}
    end
  end

  def create
    @order = Order.new(data_params)
    respond_to do |format|
      if @order.save
        format.json { render json: @order, status: :created }
        format.xml { render xml: @order, status: :created }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
        format.xml { render xml: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @order.update_attributes(data_params)
        format.json { render json: @order, status: :ok }
        format.xml { render xml: @order, status: :ok }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
        format.xml { render xml: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @order == nil
        format.json { render json: {"message":"Order does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Order does not exist"}, status: :unprocessable_entity }
      elsif @order.destroy
        format.json { render json: {"message":"Order deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Order deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
        format.xml { render xml: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:client_id, :client_name, :te_order_id, :event_name, :event_date, :discount, :event_location, :ticket_section, :cost, :ticket_row, :ticket_seats, :ticket_format, :total, :customer_email, :number_of_tickets, :sale_price_per_ticket, :ticket_total, :broker_name, :service_fee, :shipping_fee, :real_event_date, :order_data, :refund_status_id)
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