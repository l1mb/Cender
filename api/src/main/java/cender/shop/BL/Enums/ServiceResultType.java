package cender.shop.BL.Enums;

public enum ServiceResultType {
        Success(200),
        InvalidData(400),
        NotFound (404),
        InternalError(500);


        private final int id;
        ServiceResultType(int id) { this.id = id; }
        public int getValue() { return id; }
}
