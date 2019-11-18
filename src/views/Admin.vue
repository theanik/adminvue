<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
           
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                      <div class="card shadow"
                            :class="type === 'dark' ? 'bg-default': ''">
                          <div class="card-header border-0"
                              :class="type === 'dark' ? 'bg-transparent': ''">
                            <div class="row align-items-center">
                              <div class="col">
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                  
                                </h3>
                              </div>
                              <div class="col text-right">
                                 <b-button class="btn btn-success" @click.prevent="create">ADD NEW ADMIN</b-button>
                              </div>
                            </div>
                          </div>

                          <div class="table-responsive">
                            <base-table class="table align-items-center table-flush"
                                        :class="type === 'dark' ? 'table-dark': ''"
                                        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                        tbody-classes="list"
                                        :data="tableData">
                              <template slot="columns">
                                <th>Name</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                              </template>

                             <template slot-scope="{row}">
                                    <!-- <th scope="row">
                                      <div class="media align-items-center">
                                        <a href="#" class="avatar rounded-circle mr-3">
                                          <img alt="Admin" :src="`http://localhost:3000/`+row.image">
                                        </a>
                                        <div class="media-body">
                                          <span class="name mb-0 text-sm">{{row.name}}</span>
                                        </div>
                                      </div>
                                    </th> -->
                                    <td class="budget">
                                      {{ row.name}}
                                    </td>
                                    <td class="budget">
                                      {{ row.userName}}
                                    </td>
                                    <td class="budget">
                                      {{ row.email}}
                                    </td>
                                    <td>
                                      {{ row.phone }}
                                    </td>
                                  

                                    <td class="text-right">
                                      <b-button @click.prevent="show(row)" class="btn btn-info btn-sm"><i class="fa fa-eye"></i></b-button>
                                      <b-button @click.prevent="edit(row)" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></b-button>
                                      <b-button @click.prevent="destroy(row)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></b-button>
                                    </td>

                                  </template>

                            </base-table>
                          </div>

                          <div class="card-footer d-flex justify-content-end"
                              :class="type === 'dark' ? 'bg-transparent': ''">
                            <base-pagination total="{row}"></base-pagination>
                          </div>

                        </div>
                </div>
            </div>


            <!-- Modal -->
            <b-modal ref="modal" hide-footer :title="modalTitle">
              <div class="d-block">
                <b-form @submit.prevent=" editMode ? update() : storeData()" method="post">
                   <alert-error :form="form" message="There were some problems with your input."></alert-error>
                  <b-form-group label="Enter Admin Name" >
                    <b-form-input v-model="form.name" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group label="Enter Admin User Name" >
                    <b-form-input v-if="editMode == true" readonly v-model="form.userName" type="text" required placeholder="Enter email" ></b-form-input>
                    <b-form-input v-if="editMode == false" v-model="form.userName" type="text" required placeholder="Enter email" ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group label="Admin Email address:" >
                    <b-form-input v-model="form.email" type="email" required placeholder="Enter email" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Admin Phone number" >
                    <b-form-input v-model="form.phone" type="text" required placeholder="Enter Phone" ></b-form-input>
                  </b-form-group>

                  <b-form-group v-show="!editMode" label="Admin Password" >
                    <b-form-input v-show="!editMode" v-model="form.password" type="password" placeholder="Enter Password" ></b-form-input>
                  </b-form-group>

                  <b-button type="submit" variant="primary">Submit</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
              </div>
              
            </b-modal>

            <!-- show modal -->
            <b-modal ref="my-modal2" hide-footer :title="modalTitle">
            <div class="d-block">
              <b-list-group>
                <b-list-group-item><strong>Name</strong> : {{ showDetais.name }}</b-list-group-item>
                <b-list-group-item><strong>User Name</strong> : {{ showDetais.userName }}</b-list-group-item>
                <b-list-group-item><strong>Email</strong> : {{ showDetais.email }}</b-list-group-item>
                <b-list-group-item><strong>Phone</strong> : {{ showDetais.phone }}</b-list-group-item>
              </b-list-group>
            </div>
          </b-modal>
          <!-- end show modal -->
        </div>

    </div>
</template>
<script>
  import ProjectsTable from './Tables/ProjectsTable'
  import values from '../value'
  export default {
    data(){
      return{
        tableData : [],
        editMode : false,
        showMode : false,
        modalTitle : '',
        showDetais : {},
        form : new Form({
          id : '',
            name : '',
            userName : '',
            email : '',
            phone :'',
            password : '',
          }),

      }
    },
    name: 'tables',
    components: {
      ProjectsTable
    },
    mounted(){
      
      if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
      console.log('admin mounted')
      this.getData();
    },
    methods :{
      onFileSelected(event){
        console.log(event)
        this.selectedFile = event.target.files[0]
      },
      create(){
        this.editMode = false,
        this.modalTitle = "Add new Admin"
        this.form.reset()
        this.$refs['modal'].show()
        console.log('cl')
      },
      getData(){
        this.axios.get(`${values.BASE_URL}/admin_api/v1/all_admin`,
        {headers:{'auth-token':localStorage.getItem('auth-token')}})
          .then(res=>{
            console.log(res.data)
            this.tableData = res.data
          }).catch(e=>{
            console.log(e)
          })
      },
      storeData(){

        this.form.post(`${values.BASE_URL}/admin_api/v1/register_admin`,{
          headers:{'auth-token':localStorage.getItem('auth-token')}
        }).then(res=>{
          this.getData()
          if(this.form.successful){
                this.form.clear()
                this.$refs['modal'].hide()
                this.$snotify.success('Admin Add Successfully','Success')
            }else{
                this.$snotify.error('Something wend wrong. Try aging','Error')
            }
        }).catch(e=>{
          this.$snotify.error('Something went wrong..try again','Error')
            console.log(e)
        })
     
      },
      destroy(row){
          this.$snotify.clear()
          this.$snotify.confirm("You will not be able to recover this data!","Are you sure?", {
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  buttons:[
                      {
                          text : "Yes",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                              this.axios.delete(`${values.BASE_URL}/admin_api/v1/delete_admin/`+row.id,{headers:{
                              'auth-token':localStorage.getItem('auth-token'),
                              }})
                              .then(res=>{
                                console.log('doooo')
                                  this.getData()
                                  this.$snotify.success('Admin Delete','Success')
                              })
                              .catch(e=>{
                                this.$snotify.error('Something wend wrong','Error')
                                  console.log(e)
                              })
                          },
                          bold : true
                      },
                      {
                          text : "No",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                          },
                          bold : true
                      }
                      
                  ]
              })
            },
            edit(row){
              console.log(row)
              this.editMode = true
              this.modalTitle = "Edit " +row.name+" data"
              this.file = null,
              this.form.reset()
                this.form.clear()
                this.form.fill(row)

              this.$refs['modal'].show()

            },
            update(){

              this.form.put(`${values.BASE_URL}/admin_api/v1/update_admin/`+this.form.id,{
                headers :{
                  'auth-token':localStorage.getItem('auth-token'),
                }
              }).then(res=>{
                if(this.form.successful){
                    this.$refs['modal'].hide()
                    this.getData()
                    this.$snotify.success('Admin Update Successfully','Success')
                }else{
                  this.$snotify.error('Something went wrong..try again','Error')
                }
              }).catch(e=>{
                 this.$snotify.error('Something went wrong..try again','Error')
                    console.log(e)
              })
            },
            show(row){
              this.$refs['my-modal2'].show()
              this.modalTitle = "Show Details for" +row.name;
              this.showDetais = row
            }

    }
  };

</script>

<style></style>
