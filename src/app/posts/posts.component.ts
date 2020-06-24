import { Component, OnInit } from '@angular/core';
import { WpapiService } from '../services/wpapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];
  postsBuscados: any =[];
  page: any = null;
  pages: any = null;
  public wordSearch = "";
  public categorySearch = "";
  charge: boolean = true;
  categories: any = [];
  postsCategoria: any =[];
  search: boolean = false;
  pagesCategory: boolean= false;
  single: boolean = false;

  constructor( private wpapi: WpapiService, private route: ActivatedRoute ) { 
    this.page = this.route.snapshot.queryParamMap.get('page') ? this.route.snapshot.queryParamMap.get('page') : 1;
    
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('slug')) {
    this.getPost(this.route.snapshot.paramMap.get('slug'));
  } else {
    this.wpapi.posts(`per_page=9&page=${this.page}`).subscribe( data => {
      this.posts = data.body;
      this.pages = new Array(
        parseInt(data.headers.get('x-wp-totalpages'), 10)
      );

      this.charge = false;

    });
  }

  this.postsCategories();
  
}

getPost(slug) {

  this.charge = true;

  this.wpapi.posts(`slug=${slug}`)
    .subscribe( data => {
      this.posts = data.body;

      this.single = true;

     });

     this.charge = false;
}

searchWord() {

  this.charge = true;

  this.posts = [];

  this.postsCategoria = [];

  this.postsBuscados = [];

  this.pages = [];

  this.page = 1;

  this.wpapi.getPostsWithSearch(this.wordSearch, `per_page=9&page=${this.page}`).subscribe( data => {
    for( let clave in data.body ) {
      if(data.body.hasOwnProperty(clave)){

        this.posts.push(data.body[clave]);

        this.charge = false

      }
    }

    if ( this.posts.length == 0 ) {
      this.charge = false;
    };

    this.pages = new Array(
      parseInt(data.headers.get('x-wp-totalpages'), 10)
    );
    
    console.log(this.posts);
    
  },
  error =>{
    console.log(error)
  } );

  this.pagesCategory = false;
  this.search = true;


}

postsCategories() {
  this.wpapi.getCategories().subscribe( data => {
    this.categories = data;
    console.log(this.categories);
  });
}

getPostsWithCategory(){

  this.charge = true;

  this.posts = [];

  this.postsCategoria = [];

  this.postsBuscados = [];

  this.pages = [];

  this.page = 1;

  this.wpapi.getPostsWithCategory(this.categorySearch, `per_page=9&page=${this.page}`).subscribe( data => {
    for( let clave in data ) {
      if(data.hasOwnProperty(clave)){

        this.postsCategoria.push(data[clave]);

        this.charge = false;

      }
    }

    for ( let clave in this.postsCategoria[6]){
      this.posts.push(this.postsCategoria[6][clave]);
    }

    this.pages = new Array(
      parseInt(data.headers.get('x-wp-totalpages'), 10)
    );

    console.log(this.posts);
   

  },
  error =>{
    console.log(error)
  } );

  this.search = false;
  this.pagesCategory = true;

}

updatePage() {

    this.page = this.route.queryParams.subscribe( data => {
    this.page = data.page ? data.page : this.page;

    setTimeout(() => {

      this.wpapi.posts(`per_page=9&page=${this.page}`).subscribe( data => {
        this.posts = data.body;
      });

    }, 1000);

  });

}

updatePagebyCategory() {

  
  
  this.page = this.route.queryParams.subscribe( data => {
    this.page = data.page ? data.page : this.page;

    setTimeout(() => {

    this.wpapi.getPostsWithCategory(this.categorySearch, `per_page=9&page=${this.page}`).subscribe( data => {
      this.posts = data.body;
    });

  }, 1000);

  },
  error =>{
    console.log(error);
  });



}

updatePagebySearch() {

  this.page = this.route.queryParams.subscribe( data => {
  this.page = data.page ? data.page : this.page;

  setTimeout(() => {

    this.wpapi.getPostsWithSearch(this.wordSearch, `per_page=9&page=${this.page}`).subscribe( data => {
      this.posts = data.body;
    });

  }, 1000);

  },
  error =>{
    console.log(error);
  });

}


}
