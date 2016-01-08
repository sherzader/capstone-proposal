class UsersController < ApplicationController
before_filter :ensure_login, only: [:index, :show, :edit, :update]

  def create
    @user = User.new(user_params)

    if @user.save
      if @user.img_url.nil?
        @user.img_url = "23947837641_e5456f1850_m_voo3vr.jpg"
      end
      log_in!(@user)
      flash[:notice] = "Log in successful."
      redirect_to :root
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: @user.errors.full_messages, status: 422
    end
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      render :edit
    end
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :group_id, :event_id)
  end
end
