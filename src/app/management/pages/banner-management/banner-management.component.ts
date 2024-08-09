import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'; 
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ChangeDetectorRef } from '@angular/core';
import { NzModalCloseComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Banner } from '../../../core/models/Banner.model';
import { BannerService } from '../../../core/services/banner.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzSwitchModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule 
  ],
  templateUrl: './banner-management.component.html',
  styleUrl: './banner-management.component.css'
})
export class BannerManagementComponent {
  listOfData: Banner[] = [];
  filteredData: Banner[] = [...this.listOfData];
  banners: Banner[] = [];
  isVisibleAdd = false; 
  isVisibleUpdate = false;  
  isVisibleDelete = false;  
  form!: FormGroup;
  newBanner = {
    id: '',
    imageUrl: '',
    film: '',
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  ngOnInit(): void {
    this.getAllBanners();
  }
  getAllBanners(): void {
    this.bannerService.getAllBanners(0,5).subscribe(data => {
      
      this.listOfData= [];
      this.filteredData = [...this.listOfData];
      this.banners = [...this.listOfData]; 
      
      for (let i=0 ; i<data.Data.length ; i++){
        let bannertamp:Banner= {
          id: '111111',
          isActive: false,
          isDelete: false,
          createAt: new Date(),
          updateAt: new Date(),
          film: {
            isActive: false,
            isDeleted: false,
            createdAt: '',
            updatedAt: '',
            id: 'idFilmKhongCo',
            FilmName: '',
            filmUrl: '',
            description: '',
            thumbnailUrl: '',
            trailerUrl: '',
            releaseDate: '',
            duration: '',
            actors: '',
            director: '',
            language: '',
            numberOfViews: 0,
            rating: 0,
            age: 0,
            rentalType: '',
            price: 0,
            limitTime: 0,
            subtitles: [],
            narrations: [],
            comments: [],
            genres: []
          },
          imageUrl: 'abc'
        }
        
        bannertamp.id= data.Data[i].id;
        bannertamp.imageUrl= data.Data[i].imageUrl;
        if(data.Data[i].film != null && 
          data.Data[i].film.id != null )
          bannertamp.film.id= data.Data[i].film.id;
        bannertamp.createAt= data.Data[i].createAt;
        bannertamp.updateAt= data.Data[i].updateAt;
        bannertamp.isActive= data.Data[i].isActive;
        bannertamp.isDelete= data.Data[i].isDelete;
        this.banners.push(bannertamp);
      }
    });
  }
  showModalAdd(): void {
    this.isVisibleAdd = true;
  }
  handleAddOk(): void {
    const createBanner: Banner = this.form.value;
    createBanner.imageUrl = this.form.value.imageUrl;
    createBanner.film={
      isActive: false,
      isDeleted: false,
      createdAt: '',
      updatedAt: '',
      id: this.form.value.film,
      FilmName: '',
      filmUrl: '',
      description: '',
      thumbnailUrl: '',
      trailerUrl: '',
      releaseDate: '',
      duration: '',
      actors: '',
      director: '',
      language: '',
      numberOfViews: 0,
      rating: 0,
      age: 0,
      rentalType: '',
      price: 0,
      limitTime: 0,
      subtitles: [],
      narrations: [],
      comments: [],
      genres: []
    };

    createBanner.isActive= this.form.value.isActive;

    createBanner.isDelete= this.form.value.isDeleted;
    this.bannerService.createBanners(createBanner).subscribe({
      next: (response) => {
        alert(response.Message);
        this.bannerService.getAllBanners(0,5);  
        this.isVisibleAdd = false;
      },
      error: (error) => {
        console.error(error);
      }
    }) 
  }
  
  handleAddCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAdd = false;
  }  
  showModalUpdate(id:string, idFilm:string, imageUrl:string): void {
    this.isVisibleUpdate = true;
    this.form.patchValue({
      id: id,
      imageUrl: imageUrl,
      film: idFilm,
      isActive: true,
      isDeleted: false} );
     
  }
  handleUpdateOk(): void {
    const id:string =<string> this.form.value.id;
    
    const imageUrl:string= <string> this.form.value.imageUrl;
    const idFilm :string= <string> this.form.value.film;
    const isActive:boolean=  this.form.value.isActive;
    const isDeleted :boolean= this.form.value.isDeleted;
    this.bannerService.updateBanner(imageUrl,idFilm,isActive,isDeleted,id).
    subscribe({
      next: (response) => {
        alert(response.Message);
        this.getAllBanners();  
        this.isVisibleUpdate = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  handleUpdateCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleUpdate = false;
  }  
  showModalDelete(id: string): void {
    this.isVisibleDelete = true;
    this.form.patchValue({ id:id });
  }
  handleDeleteOk(): void {
    const id: string = this.form.get('id')?.value;
    this.bannerService.softDeleteBanner(id).
    subscribe({
      next: (response) => {
        alert(response);
        this.getAllBanners();  
        this.isVisibleDelete = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  handleDeleteCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDelete = false;
  }  
  constructor(private fb: FormBuilder,private bannerService: BannerService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      imageUrl: ['', Validators.required],
      film: ['', Validators.required],
      isActive: [false],
      isDeleted: [false],
      createdAt: [new Date(), Validators.required],
      updatedAt: [new Date(), Validators.required]
    });
  }
  
}
