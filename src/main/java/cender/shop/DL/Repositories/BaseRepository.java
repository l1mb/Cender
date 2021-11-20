package cender.shop.DL.Repositories;

public interface BaseRepository<T> {
    T getEntity();
    T createEntity();
    T updateEntity();
    T deleteEntity();
}
