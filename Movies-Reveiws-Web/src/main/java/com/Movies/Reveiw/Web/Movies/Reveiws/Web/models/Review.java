/*
package com.Movies.Reveiw.Web.Movies.Reveiws.Web.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id" ,nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id",referencedColumnName = "id" ,nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private int rating;

    @Column(length = 500)
    private String comment;

}
*/
