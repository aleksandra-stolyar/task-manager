class ProjectsController < ApplicationController
  http_basic_authenticate_with name: "user", password: "ruby", except: [:index, :show]
  before_action :authenticate_user!
  before_filter :find_project, only: [:show, :edit, :update, :destroy]

  def index
    @projects = Project.ordered
  end

  def show
  end

  def edit
  end

  def update
    respond_to do |format|
      if @project.update_attributes(project_params)
        format.html { redirect_to(@project, :notice => 'Project was successfully updated.') }
        format.json { render json: @project }
      else
        format.html { render :action => "edit" }
        format.json { render json: @project }
      end
    end  
  end

  def delete
  end

  def destroy
    @project.destroy
    render nothing: true, status: :ok
  end

  def new_untitled
    @project = Project.new(name: 'Untitled')
    if @project.save
      render @project
    else
      render text: @project.errors.full_messages.join, status: :error      
    end
  end

  # flowers = ['orhideya', 'hrizantema', 'pion', 'roza', 'romashka']
  # flowers.each {|flower| puts(flower) }
  # flowers.each_with_index {|flower, index| puts("flower: #{flower} has index: #{index}") }

  def save_sort
    params[:taskIds].each_with_index do |task_id, index|
      task = Task.find(task_id)
      task.rate = index
      task.save!
    end
    render nothing: true
  end

  def find_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name)
  end  
end
