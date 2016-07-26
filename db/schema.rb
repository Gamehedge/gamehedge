# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160726204209) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_stat_statements"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin", force: :cascade do |t|
    t.string   "username",        limit: 80
    t.string   "password",        limit: 765
    t.string   "firstname",       limit: 20
    t.string   "lastname",        limit: 20
    t.string   "email",           limit: 80
    t.integer  "last_login_ip",   limit: 8
    t.datetime "last_login_date"
    t.datetime "create_date"
    t.datetime "modified_date"
  end

  add_index "admin", ["email"], name: "admin_email_idx", unique: true, using: :btree
  add_index "admin", ["username"], name: "admin_username_idx", unique: true, using: :btree

  create_table "admin_access", force: :cascade do |t|
    t.integer  "admin_id"
    t.string   "module",        limit: 20
    t.integer  "access_id",     limit: 2
    t.datetime "create_date"
    t.datetime "modified_date"
  end

  add_index "admin_access", ["admin_id", "module"], name: "admin_access_admin_id_module_idx", unique: true, using: :btree

  create_table "admin_session_data", primary_key: "sess_id", force: :cascade do |t|
    t.text     "sess_data"
    t.datetime "create_date"
    t.datetime "modified_date"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "admin_users_permissions", force: :cascade do |t|
    t.integer "admin_user_id"
    t.integer "permission_id"
  end

  add_index "admin_users_permissions", ["admin_user_id"], name: "index_admin_users_permissions_on_admin_user_id", using: :btree
  add_index "admin_users_permissions", ["permission_id"], name: "index_admin_users_permissions_on_permission_id", using: :btree

  create_table "clients", id: :bigserial, force: :cascade do |t|
    t.string   "name",                   limit: 80,              null: false
    t.string   "email",                             default: "", null: false
    t.text     "password"
    t.integer  "te_uid",                 limit: 8
    t.integer  "optin",                  limit: 2,  default: 0
    t.integer  "last_login_ip",          limit: 8
    t.datetime "last_login_date"
    t.datetime "create_date"
    t.datetime "modified_date"
    t.string   "encrypted_password",                default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "temporal_pass"
  end

  add_index "clients", ["email"], name: "clients_email_idx", unique: true, using: :btree
  add_index "clients", ["email"], name: "index_clients_on_email", unique: true, using: :btree
  add_index "clients", ["reset_password_token"], name: "index_clients_on_reset_password_token", unique: true, using: :btree

  create_table "divisions", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "sport_id"
    t.integer  "division_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.boolean  "is_main_division"
  end

  add_index "divisions", ["division_id"], name: "index_divisions_on_division_id", using: :btree
  add_index "divisions", ["sport_id"], name: "index_divisions_on_sport_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "te_uid"
    t.integer  "te_performer_home_id"
    t.integer  "te_performer_visit_id"
    t.text     "data_event"
    t.datetime "te_date"
  end

  add_index "events", ["te_performer_home_id"], name: "events_te_performer_home_id_idx", using: :btree
  add_index "events", ["te_performer_visit_id"], name: "events_te_performer_visit_id_idx", using: :btree
  add_index "events", ["te_uid"], name: "events_te_uid_idx", using: :btree

  create_table "order_stats", force: :cascade do |t|
    t.integer "num",       default: 0
    t.date    "stat_date"
  end

  add_index "order_stats", ["id"], name: "id_index", unique: true, using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "client_id",                                     null: false
    t.string   "client_name",      limit: 80
    t.integer  "te_order_id",      limit: 8
    t.string   "event_name",       limit: 255
    t.string   "event_home_team",  limit: 100
    t.string   "event_away_team",  limit: 100
    t.string   "event_date",       limit: 20
    t.string   "event_location",   limit: 765
    t.string   "ticket_section",   limit: 100
    t.string   "ticket_row",       limit: 50
    t.string   "ticket_seats",     limit: 50
    t.string   "ticket_format",    limit: 24
    t.integer  "total"
    t.integer  "cost"
    t.text     "order_data"
    t.text     "ticket_data"
    t.text     "event_data"
    t.text     "home_team_data"
    t.text     "away_team_data"
    t.string   "refund_status",    limit: 20,  default: "none"
    t.datetime "create_date"
    t.datetime "modified_date"
    t.integer  "refund_status_id"
    t.datetime "real_event_date"
    t.string   "order_status"
  end

  add_index "orders", ["te_order_id"], name: "orders_te_order_id_idx", unique: true, using: :btree

  create_table "performers", id: false, force: :cascade do |t|
    t.integer  "id",                             default: "nextval('performers_sequence2'::regclass)", null: false
    t.integer  "te_uid"
    t.string   "te_name",            limit: 255
    t.string   "te_slug",            limit: 255
    t.integer  "division_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "sport_id"
    t.integer  "venue_id"
  end

  add_index "performers", ["division_id"], name: "index_performers_on_division_id", using: :btree
  add_index "performers", ["id"], name: "performers_id_idx", unique: true, using: :btree
  add_index "performers", ["te_name"], name: "performers_te_name_idx", using: :btree
  add_index "performers", ["te_slug"], name: "performers_te_slug_idx", using: :btree
  add_index "performers", ["te_uid"], name: "performers_te_uid_idx", using: :btree
  add_index "performers", ["venue_id"], name: "index_performers_on_venue_id", using: :btree

  create_table "permissions", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.string   "name"
    t.integer  "performer_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "players", ["performer_id"], name: "index_players_on_performer_id", using: :btree

  create_table "refund_statuses", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "session_data", primary_key: "sess_id", force: :cascade do |t|
    t.text     "sess_data"
    t.datetime "create_date"
    t.datetime "modified_date"
  end

  create_table "sports", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "te_uid"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "tile_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tiles", force: :cascade do |t|
    t.string   "name"
    t.integer  "tile_type_id"
    t.integer  "sport_id"
    t.integer  "performer_id"
    t.integer  "venue_id"
    t.string   "link"
    t.string   "slug"
    t.boolean  "has_geolocation"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "good_game_guarantee"
  end

  add_index "tiles", ["performer_id"], name: "index_tiles_on_performer_id", using: :btree
  add_index "tiles", ["sport_id"], name: "index_tiles_on_sport_id", using: :btree
  add_index "tiles", ["tile_type_id"], name: "index_tiles_on_tile_type_id", using: :btree
  add_index "tiles", ["venue_id"], name: "index_tiles_on_venue_id", using: :btree

  create_table "venues", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.integer  "te_uid"
    t.string   "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "divisions", "divisions"
  add_foreign_key "divisions", "sports"
  add_foreign_key "orders", "refund_statuses"
  add_foreign_key "performers", "divisions"
  add_foreign_key "performers", "sports"
  add_foreign_key "performers", "venues"
  add_foreign_key "players", "performers"
  add_foreign_key "tiles", "performers"
  add_foreign_key "tiles", "sports"
  add_foreign_key "tiles", "tile_types"
  add_foreign_key "tiles", "venues"
end
