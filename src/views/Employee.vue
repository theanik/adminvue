<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
          
           
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
                                
                                 <b-button @click.prevent="create" class="btn btn-success">ADD NEW EMPLOYEE</b-button>
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
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                  </template>

                                  <template slot-scope="{row}">
                                    <th scope="row">
                                      <div class="media align-items-center">
                                        <a href="#" class="avatar rounded-circle mr-3">
                                          <img alt="Employee" :src="row.image">
                                        </a>
                                        <div class="media-body">
                                          <span class="name mb-0 text-sm text-success">{{row.name}}</span> ({{row.username}})
                                        </div>
                                      </div>
                                    </th>
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
                <b-form  @submit.prevent="editMode ? update() : storeData()" method="post">

                  <b-form-group label="Enter Employee Name" >
                    <b-form-input v-model="name" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Employee Email address:" >
                    <b-form-input v-if="editMode == true" readonly v-model="email" type="email" required placeholder="Enter email" ></b-form-input>
                    <b-form-input v-if="editMode == false" v-model="email" type="email" required placeholder="Enter email" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Employee Phone number" >
                    <b-form-input v-model="phone" type="number" required placeholder="Enter Phone" ></b-form-input>
                  </b-form-group>
                 
                 <b-form-group label="Employee Date of Birth" >
                    <b-form-input v-model="dob" type="date" required ></b-form-input>
                  </b-form-group>

                <b-form-group label="Employee Image" >
                    <b-form-file
                    v-model="image"
                    type="file"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept=".jpg, .png, .jpeg"
                    @change="onFileSelected"
                  ></b-form-file>
                  </b-form-group>

                  <b-form-group label="Employee Address">
                    <b-form-textarea v-model="address"
                      id="textarea-default"
                      placeholder="Employee Address"
                    ></b-form-textarea>
                  </b-form-group>

                  <b-form-group label="Employee Password" >
                    <b-form-input v-model="password" type="password" placeholder="Enter Password" ></b-form-input>
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
                <b-list-group-item><strong>Email</strong> : {{ showDetais.email }}</b-list-group-item>
                <b-list-group-item><strong>Phone</strong> : {{ showDetais.phone }}</b-list-group-item>
                <b-list-group-item><strong>Date of Birth</strong> : {{ showDetais.dob }}</b-list-group-item>
                <b-list-group-item><strong>Address</strong> : {{ showDetais.address }}</b-list-group-item>
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
        file : null,
        id : '',
        name : '',
        email : '',
        phone : '',
        dob : '',
        image : null,
        address : '',
        password : '',
        selectedFile : null,
        editMode : false,
        tableData: [],
        modalTitle : '',
        showDetais : {},
        showMode : false,
      }
    },
    mounted(){
      if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
      console.log('employee mounted')
      this.getData();
    },
    name: 'tables',
    components: {
      ProjectsTable
    },
    methods :{
      onFileSelected(event){
        console.log(event)
        this.selectedFile = event.target.files[0]
      },
      create(){
        this.editMode = false
         this.file = null,
                this.name = '',
                this.email = '',
                this.phone = '',
                this.dob = '',
                this.image = null,
                this.address = '',
                this.password = '',
                this.selectedFile = null,
        this.modalTitle = "Add New Employee"
        this.$refs['modal'].show()
        console.log('cl')
      },getData(){
        this.axios.get(`${values.BASE_URL}/api/v1/all_employee`,
        {headers:{'auth-token':localStorage.getItem('auth-token')}})
          .then(res=>{
            console.log(res.data)
            this.tableData = res.data
          }).catch(e=>{
            console.log(e)
          })
      },
      storeData(){
        if(this.selectedFile){
          if(this.password){
              const fd = new FormData();
              fd.append('name',this.name)
              fd.append('email',this.email)
              fd.append('phone',this.phone)
              fd.append('dob',this.dob)
              fd.append('image',this.selectedFile)
              fd.append('address',this.address)
              fd.append('password',this.password)

              this.axios.post(`${values.BASE_URL}/api/v1/create_employee`,fd,{
                headers:{
                  'Content-Type': 'multipart/form-data; boundary='+fd._boundary,
                  'auth-token':localStorage.getItem('auth-token'),
                  }
              }).then(res=>{
                this.file = null,
                this.name = '',
                this.email = '',
                this.phone = '',
                this.dob = '',
                this.image = null,
                this.address = '',
                this.password = '',
                this.selectedFile = null,
                console.log(res)
                this.$refs['modal'].hide()
                this.getData()
                this.$snotify.success('Employee Add Successfully','Success')
              }).catch(e=>{
                this.$snotify.error('Something went wrong..try again','Error')
                console.log(e)
              })
          }else{
            this.$snotify.error('Please Enter a password','Error')
          }
        }else{
          this.$snotify.error('Please Select an Image','Error')
        }
      
     

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
                              this.axios.delete(`${values.BASE_URL}/api/v1/employee_delete/`+row.id,{headers:{
                              'auth-token':localStorage.getItem('auth-token'),
                              }})
                              .then(res=>{
                                  this.getData()
                                  this.$snotify.success('Employee Delete','Success')
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
              this.id = row.id
              this.name = row.name,
              this.email = row.email,
              this.phone = row.phone,
              this.dob = row.dob.slice(0,10),
              this.image = null,
              this.address = row.address,
              this.password = '',
              this.selectedFile = null

              this.$refs['modal'].show()

            },
            update(){
              const fd = new FormData();
                fd.append('name',this.name)
                fd.append('email',this.email)
                fd.append('phone',this.phone)
                fd.append('dob',this.dob)
                fd.append('image',this.selectedFile)
                fd.append('address',this.address)
                fd.append('password',this.password)
                this.axios.put(`${values.BASE_URL}/api/v1/employee_update/`+this.id,fd,{
                headers:{
                  'Content-Type': 'multipart/form-data; boundary='+fd._boundary,
                  'auth-token':localStorage.getItem('auth-token'),
                  }
              }).then(res=>{
                  this.file = null,
                  this.name = '',
                  this.email = '',
                  this.phone = '',
                  this.dob = '',
                  this.image = null,
                  this.address = '',
                  this.password = '',
                  this.selectedFile = null,
                  console.log(this.id)
                   this.$refs['modal'].hide()
                    this.getData()
                    this.$snotify.success('Employee Update Successfully','Success')
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








    },
    
  };

</script>

<style></style>
