ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    div class: "blank_slate_container", id: "dashboard_default_message" do
      span class: "blank_slate" do
        span "Order Stats"
      end
    end

    # Here is an example of a simple dashboard with columns and panels.
    #
    columns do
      
      column do
        panel "TODAY" do
          para Order.where(:create_date => (Date.today).beginning_of_day..Date.today.end_of_day).count
        end
      end
      column do
        panel "THIS WEEK" do
          para Order.where(:create_date => (Date.today).beginning_of_week..Date.today.end_of_day).count
        end
      end
      column do
        panel "THIS MONTH" do
          para Order.where(:create_date => (Date.today).beginning_of_month..Date.today.end_of_day).count
        end
      end
      column do
        panel "THIS YEAR" do
          para Order.where(:create_date => (Date.today).beginning_of_year..Date.today.end_of_day).count
        end
      end
    end
  end # content
end
